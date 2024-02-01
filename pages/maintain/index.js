import React from "react";
import styles from "@/styles/maintain.module.css";
import { FaMagnifyingGlass } from "react-icons/fa6";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import styled from "@emotion/styled";
import timeGridPlugin from "@fullcalendar/timegrid";
import multiMonthPlugin from "@fullcalendar/multimonth";
import Head from "next/head";
import { MAINTAIN_GET_LIST } from "@/component/ride-const";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Layout } from "@/component/ride-layout";

export const StyleWrapper = styled.div`
  .fc th {
    background: #de839e;
    color: #fff;
  }
  .fc td {
    background: #fff;
  }
  .fc-button {
    background: #de839e;
    border-color: #ffdfe8;
    font-size: 25px;
  }
  .fc-today-button .fc-button .fc-button-primary {
    background: #ffd2e0;
  }
  .fc-event {
    background: #ffd2e0;
    border: none;
  }
  .fc-event-time .fc-event-title {
    color: #0000;
  }
  .fc-toolbar-title {
  }
  .fc-daygrid-event-dot {
    border-color: #820041;
  }
  .fc-v-event .fc-event-main {
    color: #820041;
  }
`;
export default function Maintain() {
  // const [data, setData] = useState({});
  const [events, setEvents] = useState([]);
  const router = useRouter();
  useEffect(() => {
    getListData();
    console.log(events);
  }, []);

  const getListData = async () => {

    try {
      const r = await fetch(MAINTAIN_GET_LIST);
      const d = await r.json();
      let newEvents = d.rows.map((row) => ({
        title: row.amusement_ride_name,
        start: row.maintenance_begin.split('/').join('-'),
        end: row.maintenance_end.split('/').join('-'),
      }));
      console.log(newEvents);
      setEvents(newEvents);
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <>
      <Layout>
        <div className={styles.contain}>
          <h2 className={styles.title}>維護時間</h2>
          <div
            style={{ width: 1400, height: 850, paddingRight: 200, paddingLeft: 200, paddingTop: 30 }}
          >
            <StyleWrapper>
            <FullCalendar
                plugins={[dayGridPlugin, multiMonthPlugin, timeGridPlugin]}
                headerToolbar={{
                  left: "prev,next today",
                  center: "title",
                  right: "dayGridMonth,timeGridWeek,multiMonthYear",
                }}
                initialView="dayGridMonth"
                events={events}
              />
              
            </StyleWrapper>
          </div>
        </div>
      </Layout>
      <Head>
        <title>維護時間</title>
      </Head>
    </>
  );
}
