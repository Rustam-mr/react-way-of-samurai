import s from "./style.module.css"
import DialogItem from "./dialogItem/DialogItem"
import Message from "./message/Message"
import AddMessageForm from "./addMessageForm/AddMessageForm"
import React from "react"
import { InitialStateType } from "../../redux/dialogs-reducer"
import { NewMessageFormType } from "../../types/types"

type OwnProps = {
  dialogsPage: InitialStateType
  authorizedUserId: number
  sendMessage: (messageText: string) => void
}

const Dialogs: React.FC<OwnProps> = (props) => {
  const state = props.dialogsPage;
  const dialogsElements = state.dialogs.map((d) => (
    <DialogItem key={d.id} name={d.name} id={d.id} />
  ));

  const messagesElements = state.messages.map((m) => (
    <Message key={m.id} message={m.message} isOwn={m.senderId === props.authorizedUserId} />
  ));

  const addNewMessage = (values: NewMessageFormType) => {
    props.sendMessage(values.newPostText);
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
