import { randomUUID } from 'crypto'

export class User {
  public readonly id!: string

  public password!: string
  public email!: string
  public group_id!: number

  constructor(props: Omit<User, 'id'>, id?: string) {
    Object.assign(this, props)

    if (!id) {
      this.id = randomUUID()
    }
  }
}
