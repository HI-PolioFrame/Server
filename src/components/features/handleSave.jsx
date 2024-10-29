// 이름 또는 닉네임을 사용자가 입력한 값으로 바꾸는 메소드
// userId : 닉네임 or 이름 변경 버튼을 누른 사용자의 id
// name : 사용자가 이름 변경란에 입력한 string
// nickname : 사용자가 닉네임 변경란에 입력한 string

const handleSave = (userId, name, nickname) => {
    let user = oriUsers.get(userId); // 맵에서 key값을 대조하여 사용자의 정보를 찾음

    if (!name && !nickname) {
        console.log('값이 입력되지 않음');
        return;
    }
    else if (name && !nickname) { // 이름만 변경하는 경우
        if (user.name === name) {
            console.log("기존 정보와 같은 값이 입력됨");
        } else {
            user.name = name;
            console.log(user);
            oriUsers.set(userId, user); // 새로운 정보로 맵 업데이트
        }
    }
    else if (!name && nickname) { // 닉네임만 변경하는 경우
        if (user.nickname === nickname) {
            console.log("기존 정보와 같은 값이 입력됨");
        } else {
            user.nickname = nickname;
            console.log(user);
            oriUsers.set(userId, user);
        }
    }
    else { // 이름, 닉네임 모두 변경하는 경우
        if (user.name === name || user.nickname === nickname) {
            console.log("기존 정보와 같은 값이 입력됨");
        } else {
            user.name = name;
            user.nickname = nickname;
            console.log(user);
            oriUsers.set(userId, user);
        }
    }
};

export default handleSave;