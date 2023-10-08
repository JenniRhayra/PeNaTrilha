import { sign } from 'jsonwebtoken'

export class GenerateTokenProvider {
  async execute(userId: string): Promise<string> {
    const token = sign({}, process.env.JWT, {
      subject: userId,
      expiresIn: '20s',
    })

    return token
  }
}
