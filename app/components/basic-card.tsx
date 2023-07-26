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

  function findWord() {
    const text = props.text;
    const wordToSearch = props.searchText;
    const regex = new RegExp(`\\b${wordToSearch}\\b`, 'gi');
    const occurrences = text.match(regex);

    if (occurrences) {
      return `Found ${occurrences.length} occurrences of '${wordToSearch}'`;
    } else {
      return `Word not found`;
    }

  }

  // function setSpecialColor() {
  //   let style = {}
  //   let findWord = "";
  //   for (let word of props.text) {
  //     if (word === props.searchText) {
  //       findWord = word;
  //     }
  //   }
  //   if (findWord) {
  //     style = { color: "green" };
  //   }
  //   return style;
  // }




  // const style = setSpecialColor();
  const specialWord = findWord()

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {props.reference}
        </Typography>
        {/* <Typography variant="h5" component="div">
          be{bull}nev{bull}o{bull}lent
        </Typography> */}
        {/* <Typography sx={{ mb: 1.5 }} color="text.secondary">
          adjective
        </Typography> */}
        <Typography variant="body2">
          {props.text}
          <br />
          {/* {'"a benevolent smile"'} */}
        </Typography>
      </CardContent>
      {/* <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
  );
}
