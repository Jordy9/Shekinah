import { Grid, IconButton, List, ListItem, ListItemText, Typography } from '@mui/material'
import { Delete, VisibilityOutlined } from '@mui/icons-material'
import React from 'react'

export const TableQuestionResponsive = () => {
  return (
    <Grid xs = {12} item container justifyContent='center' alignItems='center' p={4}>
        <Typography marginBottom={5} variant='h5'>Listado de preguntas</Typography>
        <List sx={{ width: '100%', maxWidth: 360}}>
        {[1, 2, 3].map((value) => (
            <ListItem
                key={value}
                disableGutters
                secondaryAction={[
                    <IconButton aria-label="VisibilityOutlined">
                        <VisibilityOutlined color='info' />
                    </IconButton>,

                    <IconButton aria-label="Delete">
                    <Delete color='error' />
                    </IconButton>
                ]}
            >
                <ListItemText primary={`Line item ${value}`} />
                <ListItemText primary={`Line item ${value}`} />
            </ListItem>
        ))}
        </List>
    </Grid>
  )
}
