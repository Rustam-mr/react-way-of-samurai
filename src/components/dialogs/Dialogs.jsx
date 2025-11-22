import s from "./style.module.css";
import DialogItem from "./dialogItem/DialogItem";
import Message from "./message/Message";
import AddMessageForm from "./addMessageForm/AddMessageForm";

const Dialogs = ({dialogsPage, sendMessage, authorizedUserId}) => {
  // debugger
  const state = dialogsPage;
  const dialogsElements = state.dialogs.map((d) => (
    <DialogItem key={d.id} name={d.name} id={d.id} />
  ));

  const messagesElements = state.messages.map((m) => (
    <Message key={m.id} message={m.message} isOwn={m.senderId === authorizedUserId} />
  ));

  const addNewMessage = (values) => {
    sendMessage(values.newMessageBody);
  };

  return (
    // Главный контейнер
    <div className={s.dialogsWrapper}>
      {/* Левая колонка: Список диалогов */}
      <div className={s.dialogsItems}>
        <div className={s.dialogsListHeader}>Диалоги</div>
        <div className={s.dialogsList}>{dialogsElements}</div>
      </div>
      
      {/* Правая колонка: Окно сообщений */}
      <div className={s.messagesArea}>
        <div className={s.messagesList}>{messagesElements}</div>
        <div className={s.messageInputArea}>
          <AddMessageForm onSubmit={addNewMessage} />
        </div>
      </div>
    </div>
  );
};

export default Dialogs;
