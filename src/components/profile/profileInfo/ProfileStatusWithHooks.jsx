import { useEffect, useState } from "react";

const ProfileStatusWithHooks = ({status, updateStatus}) => {
    const [editMode, setEditMode] = useState(false);
    const [stateStatus, setStateStatus] = useState(status)

    useEffect(() => {
        setStateStatus(status)
    }, [status])

    const activateMode = () => {
        setEditMode(true)
    }

    const deactivateEditMode = () => {
        setEditMode(false)
        updateStatus(stateStatus)
    }

    const onStatusChange = (e) => {
        setStateStatus(e.currentTarget.value)
    }

    return (
        <div>
            {!editMode &&
            <div>
                <span onDoubleClick={ activateMode} >{status  || "---------"}</span
                >
            </div>
            }
            {editMode &&
            <div>
                <input onBlur={ deactivateEditMode } onChange={ onStatusChange } value={stateStatus} autoFocus={true}  />
            </div>
            }
        </div>
    )
}

export default ProfileStatusWithHooks;