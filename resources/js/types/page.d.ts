import { PredictedLog } from "./predicted-logs"

type PageProps = {
  agent: {
    os: string
  }
  request: {
    ip: string
  }
  predictedLogs: PredictedLog[],
  users: {
    id: number
    username: string
    trained_image: number
    created_at: string
  }[]
}

export { PageProps }