"use client";

import Card from "@components/Card";
import styles from './index.module.scss';

import {TbPackages} from "react-icons/tb";
import {GoWorkflow} from "react-icons/go";
import {SiPrometheus} from "react-icons/si";

export default function TestComponent() {

    return (
        <div className={styles.infoBanner} id="infrastructure">
            <div className={styles.cardContainer}>
                <Card 
                    title="Governify Environment"
                    description="A set of services that allow a multi-purposed environment for the Governify Platform."
                    icon={<TbPackages size={"5rem"} color="#777"/>}
                    btnLink="https://docs.governify.io"
                    btnText="Learn more"
                />
                <Card 
                    title="Bluejay Infrastructure"
                    description="Automated team practices audit and enforcement for software development teams based on SLAs"
                    icon={<GoWorkflow size={"5rem"} color="#777"/>}
                    btnLink="https://docs.bluejay.governify.io"
                    btnText="Bluejay Docs"
                />
                <Card 
                    title="Falcon Infrastructure"
                    description="System monitoring and auditing based on SLAs over telemetry data"
                    icon={<SiPrometheus size={"5rem"} color="#777"/>}
                    btnLink="https://docs.falcon.governify.io"
                    btnText="Falcon Docs"
                />
            </div>
        </div>
    )
}