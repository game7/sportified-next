import { signIn, useSession } from "next-auth/client";
import Link from "next/link";
import { Container, Dropdown, Header, Menu } from "semantic-ui-react";

interface Props {
  title: string;
  container?: boolean;
}

export const AdminLayout: React.FC<Props> = ({
  title,
  container,
  children,
}) => {
  const [session, loading] = useSession();
  // When rendering client side don't display anything until loading is complete
  if (typeof window !== "undefined" && loading) return null;

  // If no session exists, display access denied message
  if (!session) {
    return (
      <>
        <h1>Access Denied</h1>
        <p>
          <a
            href="/api/auth/signin"
            onClick={(e) => {
              e.preventDefault();
              signIn();
            }}
          >
            You must be signed in to view this page
          </a>
        </p>
      </>
    );
  }

  function renderChildren() {
    if (container == false) {
      return children;
    }
    return (
      <Container style={{ marginTop: 20 }}>
        {title && <Header as="h1" content={title}></Header>}
        {children}
      </Container>
    );
  }

  return (
    <>
      <Menu fixed="top" inverted>
        <Dropdown item icon="bars" simple>
          <Dropdown.Menu>
            <Link href="/admin/">
              <Dropdown.Item icon="home" content="Home" href=""></Dropdown.Item>
            </Link>
            <Dropdown.Item icon="calendar" content="Calendar"></Dropdown.Item>
            <Link href="/admin/pages">
              <Dropdown.Item
                icon="file"
                content="Pages"
                href=""
              ></Dropdown.Item>
            </Link>
          </Dropdown.Menu>
        </Dropdown>
        <Menu.Item header>SPORTIFIED</Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item
            position="right"
            icon="user"
            content={session.user.email}
          ></Menu.Item>
        </Menu.Menu>
      </Menu>
      <div style={{ paddingTop: 40, height: "100%" }}>{renderChildren()}</div>
    </>
  );
};
