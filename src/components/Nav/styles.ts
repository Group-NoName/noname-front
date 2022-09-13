import styled from "@emotion/styled";

export const NavBar = styled.div`

.link{
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    color: white;
    gap: 5px;

    .descrição{
        display: none;
        margin-left: 5px;
    }
}

.link:hover{
    opacity: 0.5;
}

@media (max-width: 991px ) {

    .link{

        .descrição{
            display: block;
        }
    }
    
}
`