import { useState, CSSProperties } from 'react'
import getResponse from 'src/services/request'
import BeatLoader from 'react-spinners/BeatLoader'

const override: CSSProperties = {
  display: 'block',
  margin: '0 auto',
}

const Home = () => {
  const [data, setData] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    getResponse()
      .then((response) => {
        setLoading(false)
        setData(response.data)
      })
      .catch((error) => {
        setError(error)
      })
  }

  return (
    <>
      <div className="mx-auto max-w-2xl py-12">
        <form onSubmit={handleSubmit}>
          <div className="items-center grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-1">
            <button className="btn btn-primary" type="submit">
              {!loading ? (
                'Generar'
              ) : (
                <BeatLoader
                  color="#F7F9CA"
                  loading={loading}
                  cssOverride={override}
                  size={15}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              )}
            </button>
          </div>
        </form>
        <div className="mt-10">
          {error && (
            <div className="card lg:card-side bg-base-100 shadow-xl border border-gray-200">
              <div className="card-body">
                <div className="flex justify-center">
                  <span>{error.message}</span>
                </div>
              </div>
            </div>
          )}
          {!loading && data && (
            <div className="card lg:card-side bg-base-100 shadow-xl border border-gray-200">
              <div className="card-body">
                {loading && !data && (
                  <div className="flex justify-center">
                    <progress className="progress w-56"></progress>
                  </div>
                )}
                {!loading && data && <pre>{data}</pre>}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Home
