import styled from "@emotion/styled";

export const NavBar = styled.nav`
.nav{
    background: rgba(0, 21, 212, 0.75);
    display: flex;
    min-height: 8vh;
}
.logo img{
    height: 3vw;
}
.logo{
    margin: 1.2em 1em 0em 1em;
}
.search-bar{
    height: 2em;
    width: 50%;
    margin: 1em 0em 0em 0em;
}
button .btn-burguer, .btn-cross{
    font-size: 3.5vw;
    color: white;
}
.btn{
    background: none;
    border: none;
    margin: 1em 0em 1em 1em;
}
.iconSettings{
    margin: auto ;
    font-size: 3.5vw;
    justify-content: space-around ;
    display: flex;
    width: 50%;
    color: white ;
}
.iconSettings .iconPerfil{
    display: flex;
}
.iconPerfil p{
    font-size: 0.5em;
}
.blockContent p{
    display: flex ;
    flex-direction:  column;
}
`