<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="EUC-KR">
<title>Insert title here</title>
</head>
<body>



	<h2>회원 상세 정보</h2>
	<h5>아이디 : ${user.id} ~</h5>
	<h5>닉네임 : ${user.nickname} ~</h5>
	<h5>성별  : ${user.gender}~</h5>
	<h5>사는곳 : ${user.address}~</h5>
	<h5>가입날짜 : ${user.created_date}~</h5>
	
</body>
</html>