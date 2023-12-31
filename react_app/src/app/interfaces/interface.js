import axios from 'axios'

const root = '/api/uniquiz/'

const Endpoints = Object.freeze({
test: 'test/time',
ranking: 'quiz/ranking',
start: 'quiz/start_quiz',
answer: 'quiz/answer/'
})

const Methods = Object.freeze({
  PUT: 'PUT',
  GET: 'GET',
  POST: 'POST',
  DELETE: 'DELETE',
  HEAD: 'HEAD',
  PATCH: 'PATCH'
})

class ApiRequestParameters {
  constructor (
    endpoint = Endpoints.Api,
    data = null,
    method = Methods.GET,
    urlParams = {},
    headers = {
    }
  ) {
    this.endpoint = endpoint
    this.data = data
    this.method = method
    this.urlParams = urlParams
    this.headers = headers
  }
}

async function getApiResponse (parameters) {
  const response = await axios({
    data: parameters.data,
    headers: parameters.headers,
    method: parameters.method,
    url: root + parameters.endpoint,
    withCredentials: true,
    params: parameters.urlParams
  })
  return response
}

export async function test () {
  const parameters = new ApiRequestParameters(
    Endpoints.test,
    null,
    Methods.GET
  )
  return getApiResponse(parameters)
}

export async function getRanking () {
  const parameters = new ApiRequestParameters(
    Endpoints.ranking,
    null,
    Methods.GET
  )
  return getApiResponse(parameters)
}

export async function startQuiz (playerName) {
  const urlParams = {
    player_name: playerName
  }
  const parameters = new ApiRequestParameters(
    Endpoints.start,
    null,
    Methods.GET,
    urlParams
  )
  return getApiResponse(parameters)
}

export async function submitAnswerToQuiz (answer) {
  const data = {  
    answer: answer
  }
  const parameters = new ApiRequestParameters(
    Endpoints.answer,
    data,
    Methods.POST
  )
  return getApiResponse(parameters)
}