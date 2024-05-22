import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Comeco.css';
import equipmentImage from './equipamentos.jpg';
import profilePic from './imageme.jpg'

// Adicione as imagens das pessoas
import person1 from './person1.png';
import person2 from './person2.png';
import person3 from './person3.png';
import person4 from './person4.png';
import person5 from './person5.png';
import linkedinIcon from './linkedinicon.png'; // Ícone do LinkedIn
import githubIcon from './githubicon.png'; // Ícone do GitHub
import youtubeIcon from './youtubeicon.png'; // Ícone do YouTube

function Comeco() {
    const navigate = useNavigate();

    return (
        <div className="pagina-inicial">
            <header className="cabecalho-intro">
                <div className="nome-empresa">Aurelia</div>
                <nav>
                    <ul className="navegacao">
                        <li onClick={() => navigate('/login')}>Login</li>
                        <li onClick={() => navigate('/register')}>Cadastrar</li>
                    </ul>
                </nav>
                <div className="impacto">
                    <h1>Experiência Exclusiva em Espaços de Luxo</h1>
                </div>
            </header>

            <section className="recursos">
                <h2 className="recursos-titulo">Recursos e Equipamentos</h2>
                <div className="recursos-container">
                    <div className="recursos-lista">
                        <ul>
                            <li>Wifi de alta performance</li>
                            <li>Ar condicionado</li>
                            <li>Luzes ajustáveis</li>
                            <li>Monitor de alta qualidade</li>
                            <li>Lousa inteligente</li>
                            <li>Comandos de voz pela Alexa</li>
                        </ul>
                    </div>
                    <img src={equipmentImage} alt="Equipamentos" className="recursos-imagem" />
                </div>
            </section>

            <section className="depoimentos">
                <h2>Depoimentos de Clientes</h2>
                <p>Veja o que nossos clientes dizem sobre nossos serviços.</p>
                <div className="depoimentos-cards">
                    <div className="card">
                        <img src={person1} alt="Person 1" className="card-img" />
                        <h3>Maria Silva</h3>
                        <p>Excelente serviço, adorei a experiência!</p>
                        <div className="stars">
                            <span>★★★★★</span>
                        </div>
                    </div>
                    <div className="card">
                        <img src={person2} alt="Person 2" className="card-img" />
                        <h3>João Oliveira</h3>
                        <p>Serviço de primeira qualidade, recomendo!</p>
                        <div className="stars">
                            <span>★★★★★</span>
                        </div>
                    </div>
                    <div className="card">
                        <img src={person3} alt="Person 3" className="card-img" />
                        <h3>Ana Costa</h3>
                        <p>Ótimo atendimento, voltarei com certeza.</p>
                        <div className="stars">
                            <span>★★★★★</span>
                        </div>
                    </div>
                    <div className="card">
                        <img src={person4} alt="Person 4" className="card-img" />
                        <h3>Pedro Lima</h3>
                        <p>Boa experiência, recomendo a todos.</p>
                        <div className="stars">
                            <span>★★★★☆</span>
                        </div>
                    </div>
                    <div className="card">
                        <img src={person5} alt="Person 5" className="card-img" />
                        <h3>Vitor Souza</h3>
                        <p>Adorei o ambiente e o atendimento.</p>
                        <div className="stars">
                            <span>★★★★☆</span>
                        </div>
                    </div>
                </div>
            </section>

            <section className="localizacoes">
                <h2>Localizações</h2>
                <p>Encontre nossas salas nas melhores localizações da cidade.</p>
                <div className="map-container">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3981.3928924707675!2d-38.545579624076865!3d-3.724204396249716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7c749bb733134a7%3A0x76da9a5f2841a532!2sUnifametro%20-%20Campus%20Carneiro%20da%20Cunha!5e0!3m2!1spt-BR!2sbr!4v1716324433225!5m2!1spt-BR!2sbr"
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </section>

            <section className="contato">
                <h2 className="contato-titulo">Contato</h2>
                <div className="contato-container">
                    <img src={profilePic} alt="Felipe Cézar" className="contato-img" />
                    <div className="contato-info">
                        <h3>Felipe Cézar</h3>
                        <p>
                            <img src={linkedinIcon} alt="LinkedIn" className="contato-icone" />
                            <a href="https://www.linkedin.com/in/felipecezarcruz" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                        </p>
                        <p>
                            <img src={githubIcon} alt="GitHub" className="contato-icone" />
                            <a href="https://github.com/felipecezarc01" target="_blank" rel="noopener noreferrer">GitHub</a>
                        </p>
                        <p>
                            <img src={youtubeIcon} alt="YouTube" className="contato-icone" />
                            <a href="https://www.youtube.com/channel/UCpRn4TDgEjlSld_sd5YHZyA" target="_blank" rel="noopener noreferrer">VidaTech - Felipe Cézar</a>
                        </p>
                    </div>
                </div>
            </section>

            <footer className="rodape">
                <p>© 2024 Sistema de Aluguel de Salas. Todos os direitos reservados.</p>
                <p>Política de Privacidade | Termos de Uso</p>
            </footer>
        </div>
    );
}

export default Comeco;
