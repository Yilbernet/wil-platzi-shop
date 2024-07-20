
const BearerToken = () => {
  return {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    }
  }
}

export default BearerToken;