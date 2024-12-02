import MockupBox from "@/components/domains/user/onboarding/MockupBox";
import styles from './layout.module.css';
import Tab from "@/components/domains/user/login/Tab";

export default function Layout({children}){
    const tabs = [
        { label: "회원", id: 0 },
        { label: "중개자", id: 1 },
        { label: "관리자", id: 2 },
    ]
    return(
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.leftBox}>
                    <MockupBox />
                </div>
                <div className={styles.rightBox}>
                    <Tab tabs={tabs}/>
                    {children}
                </div>
            </div>
        </div>
    )
}