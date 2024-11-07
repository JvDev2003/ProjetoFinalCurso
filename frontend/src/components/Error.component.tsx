import { Snackbar, Alert } from "@mui/material"

//@ts-ignore
const Error = ({texto}) => {
  return (
    <Snackbar open autoHideDuration={6000}>
        <Alert severity="error">
            {texto}
        </Alert>
    </Snackbar>
  )
}

export default Error