export interface PredictedLog {
  id: number
  result_path: string
  user_id: number
  detected_user_id: number
  score: number
  created_at: string
  username?: string
  detected?: string
}