// 계정 삭제 (사용자 정보 삭제) 메소드
// userId : 계정 삭제 버튼을 누른 사용자의 id

const handleDeleteAccount = (userId) => {
    let erasable = oriUsers.delete(userId); // 삭제 성공시 true, 실패시 false 반환

    if (!erasable) {
        console.log("계정을 삭제할 수 없음");
    } else {
        console.log("계정이 성공적으로 삭제됨");
    }

}

export default handleDeleteAccount;