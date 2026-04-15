import { NextResponse } from 'next/server'
import Replicate from 'replicate'

// Initialize Replicate client
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
})

// SDXL model version
const SDXL_VERSION = '39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea351df4979778f7e9332fd5ab'
const CONTROLNET_VERSION = 'controlnet-sdxl'

export async function POST(request: Request) {
  try {
    const { prompt, mode, image } = await request.json()

    if (!process.env.REPLICATE_API_TOKEN) {
      return NextResponse.json(
        { error: 'REPLICATE_API_TOKEN 未配置，请检查环境变量' },
        { status: 500 }
      )
    }

    let output

    if (mode === 'txt2img') {
      // Text to Image using SDXL
      output = await replicate.run(
        `stability-ai/sdxl:${SDXL_VERSION}`,
        {
          input: {
            prompt: prompt + ', architectural photography, professional rendering, high detail, 8k',
            negative_prompt: 'low quality, blurry, distorted, ugly, deformed',
            width: 1024,
            height: 1024,
            num_outputs: 1,
            num_inference_steps: 30,
            guidance_scale: 7.5,
          }
        }
      )
    } else if (mode === 'img2img') {
      // Image to Image using ControlNet
      output = await replicate.run(
        `thibaud/controlnet-sdxl`,
        {
          input: {
            image: `data:image/png;base64,${image}`,
            prompt: prompt || 'architectural rendering, professional, high quality',
            negative_prompt: 'low quality, blurry, distorted',
            strength: 0.7,
            num_inference_steps: 30,
            guidance_scale: 7.5,
          }
        }
      )
    } else {
      return NextResponse.json(
        { error: '无效的生成模式' },
        { status: 400 }
      )
    }

    // Handle different output formats
    let imageUrl: string | undefined
    if (Array.isArray(output)) {
      imageUrl = output[0] as string
    } else if (typeof output === 'string') {
      imageUrl = output
    } else if (output && typeof output === 'object') {
      const obj = output as Record<string, any>
      imageUrl = obj.url || obj.image
    }

    if (!imageUrl) {
      throw new Error('生成失败：未返回图片 URL')
    }

    return NextResponse.json({
      success: true,
      output: [imageUrl],
      urls: [imageUrl],
    })
  } catch (error) {
    console.error('Generation error:', error)
    
    const errorMessage = error instanceof Error 
      ? error.message 
      : '生成失败，请稍后重试'

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}
