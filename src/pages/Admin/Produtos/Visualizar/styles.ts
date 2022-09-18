import styled from "@emotion/styled";

export const Home = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;

.mainContent{
    margin: auto;
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
.tags{
    display: flex;
    flex-direction: column;
    justify-content: left;

    .tagscards{
        display: flex;
        flex-wrap: wrap;
        gap: 5px;
        
        .tag{
        width: 200px;
        display: flex;
        font-size: 25px;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border: 1px solid pink;
        border-radius: 10px;
        padding: 5px;

        p{
            margin: auto;
        }
    }
    }
}
.right-content{
    margin: 8% 0;
    display: flex;
    flex-direction: column;
    text-align: center;
    height: 50%;
}
.right-content img{
    border: 1px solid pink;
    border-radius: 10px;
    width:15vw;
    margin: 0 auto;
}
Button{
    width: 150px;
    margin-top: 5px;
    border: 1px solid;
}
`