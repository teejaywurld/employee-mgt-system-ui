import Head from "next/head";
import Navbar from "@/components/Navbar";
import AddEmployee from "@/components/AddEmployee";
import { getSession } from "next-auth/react";
import Login from "@/components/Login";

export default function Home({ session }) {
  if (!session) return <Login />;
  return (
    <div>
      <Head>
        <title>Employee Management System</title>        
      </Head>
        <Navbar />

      <main>
        <AddEmployee />
      </main>
    </div>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: { session },
  };
}
