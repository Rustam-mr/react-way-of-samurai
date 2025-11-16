import s from "./style.module.css";
import DialogItem from "./dialogItem/DialogItem";
import Message from "./message/Message";
import AddMessageForm from "./addMessageForm/AddMessageForm";

const Dialogs = ({dialogsPage, sendMessage}) => {
  const state = dialogsPage;
  const dialogsElements = state.dialogs.map((d) => (
    <DialogItem key={d.id} name={d.name} id={d.id} />
  ));

  const messagesElements = state.messages.map((m) => (
    <Message key={m.id} message={m.message} />
  ));

  const addNewMessage = (values) => {
    sendMessage(values.newMessageBody);
  };

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>
        <div>{dialogsElements}</div>
      </div>
      <div className={s.messages}>
        <div>{messagesElements}</div>
        <div>
          <AddMessageForm onSubmit={addNewMessage} />
        </div>
      </div>
    </div>
  );
};

export default Dialogs;
