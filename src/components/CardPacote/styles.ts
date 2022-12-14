import styled from "@emotion/styled";

export const Container = styled.div`

.imgstyle{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 286px;
    height: 180px;

    .imgs{
        overflow: hidden;
        display: flex;
        justify-content: center;
        width: 100%;
        height: 100%;
        .img{
            object-fit: cover;
        }
    }
}

.name{
    width: 100%;
    height: 90px;
    font-size: 18px;
}

.preco{
    width: 100%;
    height: 20px;
    font-size: 15px;
}
`