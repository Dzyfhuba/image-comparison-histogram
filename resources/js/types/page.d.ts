import { PredictedLog } from "./predicted-logs"

type PageProps = {
  agent: {
    os: string
  }
  predictedLogs: PredictedLog[]
}

export { PageProps }