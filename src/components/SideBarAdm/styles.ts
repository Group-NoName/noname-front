import styled from "@emotion/styled";

export const Container = styled.div`
    width: 20%;
    min-height: 100vh;
    background: rgba(0, 21, 212, 0.75);
    color: white;


    .main,
    .header,
    .produtos,
    .categorias,
    .tags{
        align-items: center;
        justify-content: center;

        h1{
            font-size: 2vw;
            margin: auto;
            text-align: center;
        }

        .Link,
        li{
            color: white;
            font-size: 1.5vw;
            margin: auto;
            text-align: center;
            list-style-type: none;
            text-decoration: none;
            display: flex;
            
        }

        li:hover{
            
            cursor: pointer;
            color: #d9faff;
        }
    }
    
    .header{
        font-size: 2.3vw;
        
        h1{
            margin-top: 10px;
        }
    }

    .produtos,
    .categorias,
    .tags{
        display: flex;
        min-height: 50vh; 

        .p,
        .c,
        .t{
            display: flex;
            flex-direction: column;
            gap: 25px;
            
        
        }
    }

   
`