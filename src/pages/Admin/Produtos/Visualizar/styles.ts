import styled from "@emotion/styled";

export const Home = styled.div`

main{
    display: flex;
}
.mainContent{
    width: 80%;
    display: flex;
    flex-direction: row;
}
.left-content{
    margin: 8% 0;
}
.icon{
    font-size: 4vw;
    margin: 1vw 0 0 2vw;
}
.content h3{
    color: rgba(0, 21, 212, 0.75)
}
.description{
    width: 40vw;
    height: 30vh;
}
.right-content{
    margin: 8% 0;
    display: flex;
    flex-direction: column;
    text-align: center;
    height: 50%;
}
.right-content img{
    width:15vw;
    margin: 0 auto;
}
Button{
    border: 2px solid black;
}
`