import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

interface BasicCardProps {
  text: string;
  match: string;
  reference: string;
}

export default function BasicCard({ text, match, reference }: BasicCardProps) {

  const parts = getHighlightedText(text, match);

  function getHighlightedText(text: string, highlight: string) {
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    console.log(parts);

    return <span>{parts.map(part => part.toLowerCase() === highlight.toLowerCase() ? <span style={{ backgroundColor: '#c3b9b970', padding: '1px' }}><b>{part}</b></span> : part)}</span>;
  }

  return (
    <Card sx={{ minWidth: 275, borderRadius: 0 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {reference}
        </Typography>
        <Typography variant="body2">
          {/* {props.text.split(' ').map((x: string) =>
            x.includes(props.match)
              ? <><span style={{ backgroundColor: 'yellow', padding: '1px' }}>{x}</span>&nbsp;</>
              : x + ' '
          )} */}

          {parts}
        </Typography>
      </CardContent>
    </Card>
  );
}
