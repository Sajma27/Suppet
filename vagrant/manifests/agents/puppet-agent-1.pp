# @summary A short summary of the purpose of this class
#
# A description of what this class does
#
# @example
#   include puppet_agent_1
class puppet_agent_1 {
  file { '/vagrant/agents/agent1.txt':
    content => 'Agent 1 melduje gotowość'
  }
}
