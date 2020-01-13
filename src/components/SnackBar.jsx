import React from "react";
import { SnackbarProvider, useSnackbar } from "notistack";

function MyApp(props) {
  const { enqueueSnackbar } = useSnackbar();
  const { message } = props;

  if (!message) {
    return null;
  }
  const dialogs = message.map(mes => enqueueSnackbar(mes.text));
  return <span>{dialogs}</span>;
  
}

export default function IntegrationNotistack(props) {
  return (
    <SnackbarProvider maxSnack={3}>
      <MyApp message={props.message} />
    </SnackbarProvider>
  );
}
