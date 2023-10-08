import { randomUUID } from 'crypto'

export class Token {
  public readonly id!: string

  public expiresIn!: number
  public user_id!: string

  constructor(props: Omit<Token, 'id'>, id?: string) {
    Object.assign(this, props)

    if (!id) {
      this.id = randomUUID()
    }
  }
}
