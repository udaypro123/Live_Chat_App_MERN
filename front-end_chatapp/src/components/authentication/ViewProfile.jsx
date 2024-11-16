import { Grid, Grid2 } from '@mui/material'

const ViewProfile = () => {
  return (
    <Grid2>
        <Grid xs={6} >
                <Grid xs={6} borderRadius="50%">
                    <img src='https://cdn-icons-png.flaticon.com/512/3135/3135715.png' height="100" width={100}></img>
                </Grid>
        </Grid>
    </Grid2>
  )
}

export default ViewProfile
