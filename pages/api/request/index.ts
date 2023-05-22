// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Configuration, OpenAIApi } from 'openai'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  })
  const openai = new OpenAIApi(configuration)
  const prompTemplate = `Inventa una receta deliciosa y saludable que se pueda preparar rápidamente con ingredientes económicos
    y que ofrezca una variedad de opciones, asegúrate de incluir instrucciones detalladas y medidas precisas.`

  try {
    const result = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: prompTemplate,
      temperature: 0.6,
      max_tokens: 4000,
    })
    res.status(200).json({
      success: true,
      data: result.data.choices[0].text?.trim(),
    })
  } catch (e) {
    res.status(400).json({
      success: false,
      data: 'Upps..! hubo un problema. Intentalo mas tarde',
    })
  }
}
