import img from './error.gif'

const ErrorMessage = () => {
  return (
    <img src={img} width={400} height={400} style={{margin: '0 auto', background: 'none', display: 'block'}}/>
  )
}
export {ErrorMessage}
