/**
 * Canvas合成ユーティリティ — cm基準シミュレーターシステム
 *
 * スケール公式:
 *   pixels_per_cm = canvas_pixels / canvas_cm
 *   tile_size_px = scale_cm * pixels_per_cm
 *
 * 製造時は同じ scale_cm / canvas_cm を print DPI で再現:
 *   print_px_per_cm = DPI / 2.54
 *   print_tile = scale_cm * print_px_per_cm
 */

export function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error(`画像の読み込みに失敗: ${url}`))
    img.src = url
  })
}

// --- 新しい型定義 (cm基準) ---

export type ImageLayer = {
  url: string
  type: 'pattern' | 'onepoint'
  scaleCm: number
  x?: number  // 0-1 正規化 (onepointのみ)
  y?: number  // 0-1 正規化 (onepointのみ)
}

export type ComposeOptions = {
  templateUrl: string
  maskUrl: string | null
  layers: ImageLayer[]
  canvasCm: number
  width: number
  height: number
}

// --- 旧型定義 (後方互換) ---

export type LegacyComposeOptions = {
  templateUrl: string
  maskUrl: string | null
  patternUrl: string | null
  onepointUrl?: string | null
  onepointX?: number
  onepointY?: number
  onepointScale?: number
  patternScale?: number
  width: number
  height: number
}

/**
 * レイヤーのパターン画像をタイル描画 (cm基準)
 */
function drawPatternLayer(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  scaleCm: number,
  canvasCm: number,
  width: number,
  height: number,
) {
  const pxPerCm = width / canvasCm
  const tileSizePx = scaleCm * pxPerCm
  // アスペクト比を保持
  const aspectRatio = img.height / img.width
  const tileW = Math.max(tileSizePx, 1)
  const tileH = Math.max(tileSizePx * aspectRatio, 1)

  for (let x = 0; x < width; x += tileW) {
    for (let y = 0; y < height; y += tileH) {
      ctx.drawImage(img, x, y, tileW, tileH)
    }
  }
}

/**
 * レイヤーのワンポイント画像を配置 (cm基準)
 */
function drawOnepointLayer(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  scaleCm: number,
  canvasCm: number,
  width: number,
  height: number,
  posX: number,
  posY: number,
) {
  const pxPerCm = width / canvasCm
  const longSidePx = scaleCm * pxPerCm

  // 長辺を longSidePx にスケール
  const isWide = img.width >= img.height
  const drawW = isWide ? longSidePx : longSidePx * (img.width / img.height)
  const drawH = isWide ? longSidePx * (img.height / img.width) : longSidePx

  const cx = posX * width - drawW / 2
  const cy = posY * height - drawH / 2
  ctx.drawImage(img, cx, cy, drawW, drawH)
}

/**
 * cm基準の合成メイン関数
 * layers配列のパターンレイヤーを先に描画（マスク＋multiply）、
 * その後ワンポイントレイヤーを上に重ねる
 */
export async function composeImageWithCanvas(opts: ComposeOptions): Promise<{ blob: Blob; canvas: HTMLCanvasElement }> {
  const { templateUrl, maskUrl, layers, canvasCm, width, height } = opts

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Canvasがサポートされていません')

  const templateImg = await loadImage(templateUrl)

  // 背景白
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, width, height)

  // パターンレイヤーを収集
  const patternLayers = layers.filter(l => l.type === 'pattern' && l.url)
  const onepointLayers = layers.filter(l => l.type === 'onepoint' && l.url)

  if (patternLayers.length > 0 && maskUrl) {
    const maskImg = await loadImage(maskUrl)

    // 一時キャンバスにパターンをタイル描画
    const tempCanvas = document.createElement('canvas')
    tempCanvas.width = width
    tempCanvas.height = height
    const tempCtx = tempCanvas.getContext('2d')!

    for (const layer of patternLayers) {
      const patImg = await loadImage(layer.url)
      drawPatternLayer(tempCtx, patImg, layer.scaleCm, canvasCm, width, height)
    }

    // マスクで切り抜き
    tempCtx.globalCompositeOperation = 'destination-in'
    tempCtx.drawImage(maskImg, 0, 0, width, height)
    tempCtx.globalCompositeOperation = 'source-over'

    // マスク内でパターン+テンプレートのmultiply合成を完結させる
    const blendCanvas = document.createElement('canvas')
    blendCanvas.width = width
    blendCanvas.height = height
    const blendCtx = blendCanvas.getContext('2d')!

    // 白背景 + マスク済みパターン
    blendCtx.fillStyle = '#ffffff'
    blendCtx.fillRect(0, 0, width, height)
    blendCtx.drawImage(tempCanvas, 0, 0)

    // テンプレートをmultiplyで合成
    blendCtx.globalCompositeOperation = 'multiply'
    blendCtx.drawImage(templateImg, 0, 0, width, height)
    blendCtx.globalCompositeOperation = 'source-over'

    // マスクで切り抜き（multiply結果をマスク内に限定）
    blendCtx.globalCompositeOperation = 'destination-in'
    blendCtx.drawImage(maskImg, 0, 0, width, height)
    blendCtx.globalCompositeOperation = 'source-over'

    // メインキャンバスにテンプレートを描画（マスク外の背景）
    ctx.drawImage(templateImg, 0, 0, width, height)

    // マスク外を残してマスク内を消す
    const eraseCanvas = document.createElement('canvas')
    eraseCanvas.width = width
    eraseCanvas.height = height
    const eraseCtx = eraseCanvas.getContext('2d')!
    eraseCtx.drawImage(maskImg, 0, 0, width, height)

    ctx.globalCompositeOperation = 'destination-out'
    ctx.drawImage(eraseCanvas, 0, 0)
    ctx.globalCompositeOperation = 'source-over'

    // multiply済みマスク内画像を重ねる
    ctx.drawImage(blendCanvas, 0, 0)
  } else if (patternLayers.length > 0) {
    // マスクなし: パターンのみ描画
    for (const layer of patternLayers) {
      const patImg = await loadImage(layer.url)
      drawPatternLayer(ctx, patImg, layer.scaleCm, canvasCm, width, height)
    }
    ctx.globalCompositeOperation = 'multiply'
    ctx.drawImage(templateImg, 0, 0, width, height)
    ctx.globalCompositeOperation = 'source-over'
  } else {
    // パターンなし: テンプレートのみ
    ctx.drawImage(templateImg, 0, 0, width, height)
  }

  // ワンポイントレイヤーを上に重ねる（マスクでクリッピング）
  if (onepointLayers.length > 0) {
    // ワンポイントのみの場合、テンプレートのマスク内を消す（2重防止）
    if (patternLayers.length === 0 && maskUrl) {
      const clearMask = await loadImage(maskUrl)
      ctx.globalCompositeOperation = 'destination-out'
      ctx.drawImage(clearMask, 0, 0, width, height)
      ctx.globalCompositeOperation = 'source-over'
    }

    for (const layer of onepointLayers) {
      try {
        const opImg = await loadImage(layer.url)
        if (maskUrl) {
          const maskImg = await loadImage(maskUrl)
          // 一時キャンバスにワンポイント描画→マスクで切り抜き
          const opCanvas = document.createElement('canvas')
          opCanvas.width = width
          opCanvas.height = height
          const opCtx = opCanvas.getContext('2d')!
          drawOnepointLayer(opCtx, opImg, layer.scaleCm, canvasCm, width, height, layer.x ?? 0.5, layer.y ?? 0.5)
          opCtx.globalCompositeOperation = 'destination-in'
          opCtx.drawImage(maskImg, 0, 0, width, height)
          opCtx.globalCompositeOperation = 'source-over'
          ctx.drawImage(opCanvas, 0, 0)
        } else {
          drawOnepointLayer(ctx, opImg, layer.scaleCm, canvasCm, width, height, layer.x ?? 0.5, layer.y ?? 0.5)
        }
      } catch {
        console.warn('ワンポイント画像の読み込みに失敗、スキップします')
      }
    }
  }

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((b) => {
      if (b) resolve(b)
      else reject(new Error('Canvas toBlob に失敗しました'))
    }, 'image/png')
  })

  return { blob, canvas }
}

/**
 * composeImage の簡易版（Blob のみ返す）
 */
export async function composeImage(opts: ComposeOptions): Promise<Blob> {
  const { blob } = await composeImageWithCanvas(opts)
  return blob
}

export type ZoomRegion = {
  x: number // 0-1 正規化
  y: number
  w: number
  h: number
}

/**
 * wearing画像のCanvasから切り出してzoom画像を生成
 */
export async function composeZoomImage(
  sourceCanvas: HTMLCanvasElement,
  outputSize: number = 800,
  zoomRegion?: ZoomRegion
): Promise<Blob> {
  const region = zoomRegion ?? { x: 0.3, y: 0.15, w: 0.4, h: 0.4 }

  const sw = sourceCanvas.width
  const sh = sourceCanvas.height
  const sx = region.x * sw
  const sy = region.y * sh
  const sWidth = region.w * sw
  const sHeight = region.h * sh

  const zoomCanvas = document.createElement('canvas')
  zoomCanvas.width = outputSize
  zoomCanvas.height = outputSize
  const ctx = zoomCanvas.getContext('2d')
  if (!ctx) throw new Error('Canvasがサポートされていません')

  ctx.drawImage(sourceCanvas, sx, sy, sWidth, sHeight, 0, 0, outputSize, outputSize)

  return new Promise<Blob>((resolve, reject) => {
    zoomCanvas.toBlob((b) => {
      if (b) resolve(b)
      else reject(new Error('ズーム toBlob に失敗しました'))
    }, 'image/png')
  })
}

/**
 * 合成結果を /api/compose にアップロード
 */
export async function uploadMockup(
  applicationId: string,
  itemId: string,
  imageType: 'wearing' | 'product' | 'zoom',
  blob: Blob
): Promise<string> {
  const formData = new FormData()
  formData.append('applicationId', applicationId)
  formData.append('itemId', itemId)
  formData.append('imageType', imageType)
  formData.append('file', blob, `${imageType}.png`)

  const res = await fetch('/api/compose', { method: 'POST', body: formData })
  if (!res.ok) {
    const data = await res.json().catch(() => ({}))
    throw new Error(data.error || `アップロードに失敗: ${imageType}`)
  }
  const data = await res.json()
  return data.url
}

export type ComposeItemData = {
  itemId: string
  templateWearingUrl: string | null
  templateMaskWearingUrl: string | null
  templateProductUrl: string | null
  templateMaskProductUrl: string | null
  layers: ImageLayer[]
  canvasCm: number
  maskConfig?: { zoom_region?: ZoomRegion } | null
}

/**
 * 1アイテム分のモックアップ（wearing, product）を合成＆アップロード
 * wearingBlob を渡すと wearing の再合成をスキップ（既にレンダリング済みのCanvasから取得した場合）
 */
export async function composeAndUploadItem(
  applicationId: string,
  item: ComposeItemData,
  onProgress?: (type: string) => void,
  wearingBlob?: Blob | null
): Promise<{ wearing?: string; product?: string; zoom?: string }> {
  const results: { wearing?: string; product?: string; zoom?: string } = {}

  // Wearing と Product を並列で合成＆アップロード
  const tasks: Promise<void>[] = []

  if (item.templateWearingUrl) {
    tasks.push((async () => {
      onProgress?.('wearing')
      let blob: Blob
      if (wearingBlob) {
        // 既にレンダリング済みのCanvasから取得したblobを使用（高速）
        blob = wearingBlob
      } else {
        const result = await composeImageWithCanvas({
          templateUrl: item.templateWearingUrl!,
          maskUrl: item.templateMaskWearingUrl,
          layers: item.layers,
          canvasCm: item.canvasCm,
          width: 800,
          height: 1000,
        })
        blob = result.blob
      }
      results.wearing = await uploadMockup(applicationId, item.itemId, 'wearing', blob)
    })())
  }

  if (item.templateProductUrl) {
    tasks.push((async () => {
      onProgress?.('product')
      const productBlob = await composeImage({
        templateUrl: item.templateProductUrl!,
        maskUrl: item.templateMaskProductUrl ?? null,
        layers: item.layers,
        canvasCm: item.canvasCm,
        width: 800,
        height: 800,
      })
      results.product = await uploadMockup(applicationId, item.itemId, 'product', productBlob)
    })())
  }

  await Promise.all(tasks)

  return results
}
