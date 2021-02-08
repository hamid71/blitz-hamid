import Layout from "app/layouts/Layout"
import { Link, useRouter, useMutation, BlitzPage } from "blitz"
import createProject from "app/projects/mutations/createProject"
import ProjectForm from "app/projects/components/ProjectForm"
import getCurrentUser from "app/users/queries/getCurrentUser"
import {useSession} from "blitz"
const NewProjectPage: BlitzPage = () => {
  const router = useRouter()
  const [createProjectMutation] = useMutation(createProject)
  const session = useSession()
  return (
    <div>
      <h1>Create New Project</h1>


      <ProjectForm
        initialValues={{}}
        onSubmit={async (event) => {
          try {
            const project = await createProjectMutation({
             data:  {
               name: event.target[0].value,
               
               description: event.target[1].value,

               projecimpacts: event.target[2].value,

               projectoutcomes: event.target[3].value,
               
               beneficiaries:{ connect: { id: parseInt(event.target[4].value)}},
                
               projectindicators:{connect:{id: parseInt(event.target[5].value)},
               },
               user: { connect: { id: session.userId, } } 
               } 
            })
            
            alert("Success!" + JSON.stringify(project))
            router.push(`/projects/${project.id}`)
          } catch (error) {
            alert("Error creating project " + JSON.stringify(error, null, 2))
          }
        }}
      />

      <p>
        <Link href="/projects">
          <a>Projects</a>
        </Link>
      </p>
    </div>
  )
}

NewProjectPage.getLayout = (page) => <Layout title={"Create New Project"}>{page}</Layout>

export default NewProjectPage
