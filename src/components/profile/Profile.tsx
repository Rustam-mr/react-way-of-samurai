import React from "react"
import MyPostsContainer from "./myPosts/MyPostsContainer"
import ProfileInfo from "./profileInfo/ProfileInfo"
import { ProfileType } from "../../types/types"

type PropsType = {
    isOwner: boolean
    profile: ProfileType | null
    status: string
    updateStatus: (status: string) => void
    savePhoto: (file: File) => void
    saveProfile: (formData: ProfileType) => Promise<void>
}

const Profile: React.FC<PropsType> = React.memo(({isOwner, profile, status, updateStatus, savePhoto, saveProfile}) => {
    return (
        <div>
            <ProfileInfo isOwner={isOwner} profile={profile} status={status} updateStatus={updateStatus} savePhoto={savePhoto} saveProfile={saveProfile} />
            <MyPostsContainer />
        </div>
    );
})

export default Profile

