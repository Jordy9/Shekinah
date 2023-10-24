import { Box } from '@mui/material';
import React from 'react'
import './progress.css'

export const ProgressComponent = ({ record, change }) => {

    const porcentage = ( ( change + 1 ) / record?.preguntas?.length ) * 100

    const gradientStyle = {
        width: `${ porcentage }%`,
        background: `linear-gradient(90deg, #000080, #87CEEB)`,
    };

  return (
    <Box mb={ 1 } className="progress-bar">
        <Box className="progress-fill" sx={gradientStyle}>
            { change + 1 }

            <Box sx={{ position: 'absolute', color: 'white', right: 4, backgroundColor: 'primary.main', borderRadius: '50%', p: 0.02  }}>
                { record?.preguntas?.length }
            </Box>
        </Box>
    </Box>
  )
}
