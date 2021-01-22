import Mock from 'mockjs'
import { apis } from '../api/apis'

Mock.mock(apis.answers, (req, res) => {
  return "This means success"
})