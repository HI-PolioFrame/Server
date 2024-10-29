// 이메일을 사용자가 입력한 값으로 바꾸는 메소드
// userId : 이메일 변경 버튼을 누른 사용자의 id
// email : 사용자가 이메일 변경란에 입력한 string

const handleEmailChange = (userId, email) => {
    let user = oriUsers.get(userId); // 맵에서 key값을 대조하여 사용자의 정보를 찾음

    if (!email) {
        console.log('값이 입력되지 않음');
        return;
    }

    if (email === user.email) {
        console.log("기존 정보와 같은 값이 입력됨");
    } else {
        user.email = email;
        console.log(user);
        oriUsers.set(userId, user); // 새로운 정보로 맵 업데이트
    }
}

export default handleEmailChange;