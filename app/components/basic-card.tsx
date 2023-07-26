import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function BasicCard(props) {

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {props.reference}
        </Typography>
        <Typography variant="body2">
          {props.text.split(' ').map((x: string) =>
            x.includes(props.match)
              ? <><span style={{ backgroundColor: 'yellow', padding: '1px' }}>{x}</span>&nbsp;</>
              : x + ' '
          )}
        </Typography>
      </CardContent>
    </Card>
  );
}
