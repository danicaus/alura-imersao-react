// import styled from 'styled-components'
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons.js'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'

function ProfileSidebar() {
  const githubUser = 'danicaus'

  return (
    <Box>
      <img src={`https://github.com/${githubUser}.png`} style={{borderRadius: '8px'}}/>
    </Box>
  )
}

export default function Home() {
  const pessoasFavoritas = [
    'marcobrunodev',
    'omariosouto',
    'peas',
    'juunegreiros',
    'rafaballerini'
  ]
  
  return (
  <>
    <AlurakutMenu/>
    <MainGrid>
      <div className="profileArea" style={{ gridArea: 'profileArea' }}>
        <ProfileSidebar/>
        <OrkutNostalgicIconSet/>
      </div>
      <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
        <Box>
          <h1 className="title">
            Bem-vinda, Daniela!
          </h1>
        </Box>
        <Box>
          O que você deseja fazer?
        </Box>
      </div>
      <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
        <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">
            Meus amigos ({pessoasFavoritas.length})
          </h2>

          <ul>
            {pessoasFavoritas.map((amigo) => {
              return (
                <li>
                  <a href={`users/${amigo}`} key={amigo}>
                    <img src={`https://github.com/${amigo}.png`} />
                    <span>{amigo}</span>  
                  </a>
                </li>
              )
            })}
          </ul>
        </ProfileRelationsBoxWrapper>
        <Box>
          Comunidades
        </Box>
      </div>
    </MainGrid>
  </>
  )

}
