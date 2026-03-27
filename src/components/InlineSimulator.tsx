'use client'

import { useRef, useEffect, useCallback, forwardRef, useImperativeHandle } from 'react'
import type { ImageLayer } from '@/lib/compose-utils'

type InlineSimulatorProps = {
  templateWearingUrl: string | null
  templateMaskWearingUrl: string | null
  layers: ImageLayer[]
  canvasCm: number
  blendStrength?: number // 0-100, default 100 (full multiply)
  width?: number
  height?: number
  className?: string
}

export type InlineSimulatorHandle = {
  getCanvas: () => HTMLCanvasElement | null
  toBlob: () => Promise<Blob | null>
}

const loadImg = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = url
  })

const InlineSimulator = forwardRef<InlineSimulatorHandle, InlineSimulatorProps>(function InlineSimulator({
  templateWearingUrl,
  templateMaskWearingUrl,
  layers,
  canvasCm,
  blendStrength = 50,
  width = 800,
  height = 1000,
  className = '',
}, ref) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useImperativeHandle(ref, () => ({
    getCanvas: () => canvasRef.current,
    toBlob: () => new Promise<Blob | null>((resolve) => {
      const canvas = canvasRef.current
      if (!canvas) { resolve(null); return }
      canvas.toBlob((b) => resolve(b), 'image/png')
    }),
  }))

  const renderIdRef = useRef(0)

  const renderPreview = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const w = canvas.width
    const h = canvas.height

    ctx.clearRect(0, 0, w, h)
    ctx.fillStyle = '#f3f4f6'
    ctx.fillRect(0, 0, w, h)

    const currentId = ++renderIdRef.current

    const run = async () => {
      // 新しい描画が開始されていたら中断
      const cancelled = () => renderIdRef.current !== currentId
      if (!templateWearingUrl) {
        ctx.fillStyle = '#e5e7eb'
        ctx.fillRect(0, 0, w, h)
        ctx.fillStyle = '#9ca3af'
        ctx.font = '14px sans-serif'
        ctx.textAlign = 'center'
        ctx.fillText('テンプレート未設定', w / 2, h / 2)
        return
      }

      try {
        const templateImg = await loadImg(templateWearingUrl)
        if (cancelled()) return

        ctx.fillStyle = '#ffffff'
        ctx.fillRect(0, 0, w, h)

        const patternLayers = layers.filter(l => l.type === 'pattern' && l.url)
        const onepointLayers = layers.filter(l => l.type === 'onepoint' && l.url)
        const pxPerCm = w / canvasCm

        if (patternLayers.length > 0) {
          if (templateMaskWearingUrl) {
            const maskImg = await loadImg(templateMaskWearingUrl)

            // パターンをタイル描画 (cm基準)
            const tempCanvas = document.createElement('canvas')
            tempCanvas.width = w
            tempCanvas.height = h
            const tempCtx = tempCanvas.getContext('2d')!

            for (const layer of patternLayers) {
              const patImg = await loadImg(layer.url)
              const tileSizePx = layer.scaleCm * pxPerCm
              const aspectRatio = patImg.height / patImg.width
              const tileW = Math.max(tileSizePx, 1)
              const tileH = Math.max(tileSizePx * aspectRatio, 1)
              for (let x = 0; x < w; x += tileW) {
                for (let y = 0; y < h; y += tileH) {
                  tempCtx.drawImage(patImg, x, y, tileW, tileH)
                }
              }
            }

            // マスクで切り抜き
            tempCtx.globalCompositeOperation = 'destination-in'
            tempCtx.drawImage(maskImg, 0, 0, w, h)
            tempCtx.globalCompositeOperation = 'source-over'
            if (cancelled()) return

            ctx.drawImage(tempCanvas, 0, 0)

            // テンプレートをmultiplyで重ねる
            ctx.globalCompositeOperation = 'multiply'
            ctx.drawImage(templateImg, 0, 0, w, h)
            ctx.globalCompositeOperation = 'source-over'

            // 合成強度調整: multiply結果と元パターンをalpha混合
            if (blendStrength < 100) {
              const alpha = blendStrength / 100
              // 元パターン（マスク済み）を(1-alpha)の透明度で上に重ねる
              ctx.globalAlpha = 1 - alpha
              ctx.drawImage(tempCanvas, 0, 0)
              ctx.globalAlpha = 1
            }

            // マスク外を復元
            const restoreCanvas = document.createElement('canvas')
            restoreCanvas.width = w
            restoreCanvas.height = h
            const restoreCtx = restoreCanvas.getContext('2d')!
            restoreCtx.drawImage(templateImg, 0, 0, w, h)
            restoreCtx.globalCompositeOperation = 'destination-out'
            restoreCtx.drawImage(maskImg, 0, 0, w, h)
            restoreCtx.globalCompositeOperation = 'source-over'
            ctx.drawImage(restoreCanvas, 0, 0)
          } else {
            // マスクなし
            for (const layer of patternLayers) {
              const patImg = await loadImg(layer.url)
              const tileSizePx = layer.scaleCm * pxPerCm
              const aspectRatio = patImg.height / patImg.width
              const tileW = Math.max(tileSizePx, 1)
              const tileH = Math.max(tileSizePx * aspectRatio, 1)
              for (let x = 0; x < w; x += tileW) {
                for (let y = 0; y < h; y += tileH) {
                  ctx.drawImage(patImg, x, y, tileW, tileH)
                }
              }
            }
            ctx.globalCompositeOperation = 'multiply'
            ctx.drawImage(templateImg, 0, 0, w, h)
            ctx.globalCompositeOperation = 'source-over'

            // 合成強度調整（マスクなし）
            if (blendStrength < 100) {
              const alpha = blendStrength / 100
              const patOnlyCanvas = document.createElement('canvas')
              patOnlyCanvas.width = w
              patOnlyCanvas.height = h
              const patOnlyCtx = patOnlyCanvas.getContext('2d')!
              for (const layer of patternLayers) {
                const patImg2 = await loadImg(layer.url)
                const tileSizePx2 = layer.scaleCm * pxPerCm
                const ar2 = patImg2.height / patImg2.width
                const tw2 = Math.max(tileSizePx2, 1)
                const th2 = Math.max(tileSizePx2 * ar2, 1)
                for (let x = 0; x < w; x += tw2) {
                  for (let y = 0; y < h; y += th2) {
                    patOnlyCtx.drawImage(patImg2, x, y, tw2, th2)
                  }
                }
              }
              ctx.globalAlpha = 1 - alpha
              ctx.drawImage(patOnlyCanvas, 0, 0)
              ctx.globalAlpha = 1
            }
          }
        } else {
          ctx.drawImage(templateImg, 0, 0, w, h)
        }

        // ワンポイントレイヤー（マスクの中心を基準に配置）
        // マスクがある場合、マスクの不透明ピクセルの重心を計算
        let maskCenterX = 0.5 * w
        let maskCenterY = 0.5 * h
        if (templateMaskWearingUrl && onepointLayers.length > 0) {
          try {
            const maskImg2 = await loadImg(templateMaskWearingUrl)
            const mc = document.createElement('canvas')
            mc.width = w
            mc.height = h
            const mctx = mc.getContext('2d')!
            mctx.drawImage(maskImg2, 0, 0, w, h)
            const mdata = mctx.getImageData(0, 0, w, h).data
            let totalAlpha = 0, sumX = 0, sumY = 0
            for (let py = 0; py < h; py++) {
              for (let px = 0; px < w; px++) {
                const a = mdata[(py * w + px) * 4 + 3]
                if (a > 0) {
                  totalAlpha += a
                  sumX += px * a
                  sumY += py * a
                }
              }
            }
            if (totalAlpha > 0) {
              maskCenterX = sumX / totalAlpha
              maskCenterY = sumY / totalAlpha
            }
          } catch {
            // マスク読み込み失敗時はcanvas中央のまま
          }
        }

        if (cancelled()) return

        if (onepointLayers.length > 0 && templateMaskWearingUrl) {
          // マスクでクリッピングしてワンポイントを描画
          const maskImg3 = await loadImg(templateMaskWearingUrl)
          if (cancelled()) return

          // ワンポイントのみの場合、テンプレートのマスク内を消す（2重防止）
          if (patternLayers.length === 0) {
            ctx.globalCompositeOperation = 'destination-out'
            ctx.drawImage(maskImg3, 0, 0, w, h)
            ctx.globalCompositeOperation = 'source-over'
          }

          for (const layer of onepointLayers) {
            try {
              const opImg = await loadImg(layer.url)
              const longSidePx = layer.scaleCm * pxPerCm
              const isWide = opImg.width >= opImg.height
              const drawW = isWide ? longSidePx : longSidePx * (opImg.width / opImg.height)
              const drawH = isWide ? longSidePx * (opImg.height / opImg.width) : longSidePx
              const cx = maskCenterX - drawW / 2
              const cy = maskCenterY - drawH / 2

              // 一時キャンバスにワンポイント描画→マスクで切り抜き
              const opCanvas = document.createElement('canvas')
              opCanvas.width = w
              opCanvas.height = h
              const opCtx = opCanvas.getContext('2d')!
              opCtx.drawImage(opImg, cx, cy, drawW, drawH)
              opCtx.globalCompositeOperation = 'destination-in'
              opCtx.drawImage(maskImg3, 0, 0, w, h)
              opCtx.globalCompositeOperation = 'source-over'
              ctx.drawImage(opCanvas, 0, 0)
            } catch {
              // ワンポイント読み込み失敗時はスキップ
            }
          }
        } else if (onepointLayers.length > 0) {
          // マスクなしの場合はそのまま描画
          for (const layer of onepointLayers) {
            try {
              const opImg = await loadImg(layer.url)
              const longSidePx = layer.scaleCm * pxPerCm
              const isWide = opImg.width >= opImg.height
              const drawW = isWide ? longSidePx : longSidePx * (opImg.width / opImg.height)
              const drawH = isWide ? longSidePx * (opImg.height / opImg.width) : longSidePx
              const cx = maskCenterX - drawW / 2
              const cy = maskCenterY - drawH / 2
              ctx.drawImage(opImg, cx, cy, drawW, drawH)
            } catch {
              // skip failed onepoint
            }
          }
        }
      } catch (e) {
        console.error('プレビュー描画エラー:', e)
        ctx.fillStyle = '#fee2e2'
        ctx.fillRect(0, 0, w, h)
        ctx.fillStyle = '#ef4444'
        ctx.font = '14px sans-serif'
        ctx.textAlign = 'center'
        ctx.fillText('画像の読み込みに失敗', w / 2, h / 2)
      }
    }

    run()
  }, [templateWearingUrl, templateMaskWearingUrl, layers, canvasCm, blendStrength])

  useEffect(() => {
    renderPreview()
  }, [renderPreview])

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className={`w-full h-full object-contain ${className}`}
    />
  )
})

export default InlineSimulator
