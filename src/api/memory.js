import apiUrl from '../apiConfig'
import axios from 'axios'

export const memDelete = (id, user) => {
  return axios({
    url: apiUrl + '/memories/' + id,
    method: 'DELETE',
    // Add an authorization header
    headers: {
      // we need the user, so we have access to their token
      'Authorization': `Bearer ${user.token}`
    }
  })
}
