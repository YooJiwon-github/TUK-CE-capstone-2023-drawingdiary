import styled from "styled-components";

const NavStyle = styled.div`
    width: 100%;
    height: 30px;
    padding: 10px 0 10px 0;
    position: sticky;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    cursor: pointer;
`;

const LinkStyle = styled.a`
    text-decoration: none;
    font-size: 10px;
    color: #292929;
    margin-right: 30px;
`;

const TextStyle = styled.text`
    font-size: 15px;
`;

const NavBar = () => {
    return (
        <NavStyle>
            <LinkStyle href="/">
                <TextStyle>캘린더</TextStyle>
            </LinkStyle>

            <LinkStyle href="/album">
                <TextStyle>앨범</TextStyle>
            </LinkStyle>

            <LinkStyle href="/stats">
                <TextStyle>분석</TextStyle>
            </LinkStyle>

            <LinkStyle href="/my">
                <TextStyle>마이페이지</TextStyle>
            </LinkStyle>
        </NavStyle>
    );
};

export default NavBar;

