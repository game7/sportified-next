import { FC } from "react";
import { Button, Divider, Grid } from "semantic-ui-react";
import { useHub } from "../../hooks/use-hub";
import { Actions } from "../pages/edit/actions";

export const BlockSeparator: FC<{
  position: number;
}> = ({ position }) => {
  const hub = useHub<Actions>();

  function handleAddBlock(position: number) {
    return function addBlock() {
      hub.send("AddBlock", { position });
    };
  }

  return (
    <Grid padded>
      <Grid.Column width={1}></Grid.Column>
      <Grid.Column width={6} textAlign="center">
        <Divider></Divider>
      </Grid.Column>
      <Grid.Column width={2} textAlign="center">
        <Button icon="plus" size="mini" onClick={handleAddBlock(position)} />
      </Grid.Column>
      <Grid.Column width={6} textAlign="center">
        <Divider></Divider>
      </Grid.Column>
      <Grid.Column width={1}></Grid.Column>
    </Grid>
  );
};
