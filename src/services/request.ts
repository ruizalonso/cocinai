const getResponse = async () => {
  const response = await fetch('api/request')
  return await response.json()
}
export default getResponse
