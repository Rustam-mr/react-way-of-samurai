import React from "react";
import MyPostsContainer from "./myPosts/MyPostsContainer";
import ProfileInfo from "./profileInfo/ProfileInfo";

const Profile = React.memo(({isOwner, profile, status, updateStatus, savePhoto, saveProfile}) => {
    return (
        <div>
            <ProfileInfo isOwner={isOwner} profile={profile} status={status} updateStatus={updateStatus} savePhoto={savePhoto} saveProfile={saveProfile} />
            <MyPostsContainer />
        </div>
    );
})

export default Profile;

