
interface Props {
    title: string;
}

const AdminLayout: React.FC<Props> = ({ title, children }) => {

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: 960 }}>
                <h1 style={{ borderBottom: '1px solid #dedede' }}>{title}</h1>
                {children}
            </div>
        </div>
    )
}

export default AdminLayout